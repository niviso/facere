import * as Haptics from 'expo-haptics';

const Interaction = {
    success: (): void => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    },
    delete: (): void => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
          )
    },
    on: (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    },
    off: (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }

};

export default Interaction;