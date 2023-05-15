import { supabase } from 'utils/superbase-client';
import notificationType from 'constants/notification-type';

export const getNotifications = (userId) => {
  return supabase
    .from('notifications')
    .select(
      'id, read, url, createdAt, type, notifier: users!notifications_notifierId_fkey(id, firstName, lastName, avatar)'
    )
    .eq('userId', userId)
    .limit(10)
    .order('createdAt', { ascending: false })
    .throwOnError();
};
export const readAllNotification = (userId) => {
  return supabase.from('notifications').update({ read: true }).eq('userId', userId).throwOnError();
};

export const readNotification = (id) => {
  return supabase.from('notifications').update({ read: true }).eq('id', id).throwOnError();
};

export const sendCommentNotification = (userId, notifierIds = []) => {
  return supabase
    .from('notifications')
    .upsert(
      notifierIds.map((notifierId) => ({
        userId,
        type: notificationType.MENTION_IN_COMMENT,
        notifierId,
      }))
    )
    .throwOnError();
};

export const getUnreadNotificationsCount = (userId) => {
  return supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId)
    .eq('read', false);
};

export const subscribeToNotifications = (userId, handleUpdateNotifications) => {
  supabase
    .channel('public:notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `userId=eq.${userId}`,
      },
      handleUpdateNotifications
    )
    .subscribe();
};

export const unsubscribeNotifications = () => {
  supabase.removeChannel('public:notifications');
};
