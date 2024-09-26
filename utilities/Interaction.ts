import * as Haptics from 'expo-haptics';

const Interaction = {
    success: () => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    },
    delete: () => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
          )
    },
    on: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    },
    off: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }

};

export default Interaction;