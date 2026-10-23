import UIKit
import Capacitor
import CoreLocation

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = CAPBridgeViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        LocationAlways.becameActive()
    }

    func sceneWillResignActive(_ scene: UIScene) {
        LocationAlways.resignedActive()
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

/// Location is Always for this app, so it opens already located.
///
/// iOS only grants a real Always in two steps. Asking for Always first only
/// gives a provisional Always shown as While Using, and every later Always ask
/// is ignored, so the upgrade prompt never comes. The order that works:
/// 1. Not asked yet: ask for While Using.
/// 2. Now While Using, upgrade never asked: ask for Always. iOS shows
///    "Change to Always Allow" right away. This ask is spent once per install.
/// 3. Still not Always after that (kept While Using, or denied): one alert per
///    launch that opens Settings > Gas > Location.
@MainActor
final class LocationAlways: NSObject, CLLocationManagerDelegate {
    private static let shared = LocationAlways()
    private static let upgradeAsked = "location.alwaysUpgradeAsked"
    private let manager = CLLocationManager()

    /// The upgrade prompt is on screen or about to be; hold the Settings alert.
    private var upgradePending = false
    /// The app went inactive after the upgrade ask, so the prompt really showed.
    private var promptShown = false
    private var alertShownThisLaunch = false

    private override init() {
        super.init()
        manager.delegate = self
    }

    static func becameActive() {
        let s = shared
        if s.upgradePending && s.promptShown {
            s.upgradePending = false
            s.promptShown = false
        }
        s.step()
    }

    static func resignedActive() {
        if shared.upgradePending { shared.promptShown = true }
    }

    private func step() {
        switch manager.authorizationStatus {
        case .notDetermined:
            manager.requestWhenInUseAuthorization()
        case .authorizedAlways, .restricted:
            break
        case .authorizedWhenInUse where !UserDefaults.standard.bool(forKey: Self.upgradeAsked):
            UserDefaults.standard.set(true, forKey: Self.upgradeAsked)
            upgradePending = true
            promptShown = false
            manager.requestAlwaysAuthorization()
            // If iOS shows nothing, don't hold the Settings alert forever.
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) { [weak self] in
                guard let self, self.upgradePending, !self.promptShown else { return }
                self.upgradePending = false
                self.step()
            }
        default:
            if !upgradePending { offerSettings() }
        }
    }

    private func offerSettings() {
        guard !alertShownThisLaunch,
              UIApplication.shared.applicationState == .active,
              let root = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController else { return }
        var top = root
        while let presented = top.presentedViewController { top = presented }
        if top is UIAlertController { return }
        alertShownThisLaunch = true

        let alert = UIAlertController(
            title: "Gas needs Always location",
            message: "So it opens already knowing where you are. In Settings, tap Location, then Always.",
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "Not now", style: .cancel))
        alert.addAction(UIAlertAction(title: "Open Settings", style: .default) { _ in
            if let url = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(url)
            }
        })
        alert.preferredAction = alert.actions.last
        top.present(alert, animated: true)
    }

    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        Task { @MainActor in
            // A change means any pending upgrade prompt was answered.
            if self.upgradePending && manager.authorizationStatus != .authorizedWhenInUse {
                self.upgradePending = false
            }
            self.step()
        }
    }
}
