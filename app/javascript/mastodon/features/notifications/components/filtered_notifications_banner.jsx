import { useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import ArchiveIcon from '@/material-icons/400-24px/archive.svg?react';
import { fetchNotificationPolicy } from 'mastodon/actions/notifications';
import { Icon } from 'mastodon/components/icon';
import { toCappedNumber } from 'mastodon/utils/numbers';

export const FilteredNotificationsBanner = () => {
  const dispatch = useDispatch();
  const policy = useSelector(state => state.get('notificationPolicy'));

  useEffect(() => {
    dispatch(fetchNotificationPolicy());

    const interval = setInterval(() => {
      dispatch(fetchNotificationPolicy());
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (policy === null || policy.getIn(['summary', 'pending_notifications_count']) * 1 === 0) {
    return null;
  }

  return (
    <Link className='filtered-notifications-banner' to='/notifications/requests'>
      <Icon icon={ArchiveIcon} />

      <div className='filtered-notifications-banner__text'>
        <strong><FormattedMessage id='filtered_notifications_banner.title' defaultMessage='Filtered notifications' /></strong>
        <span><FormattedMessage id='filtered_notifications_banner.pending_requests' defaultMessage='Notifications from {count, plural, =0 {no} one {one person} other {# people}} you may know' values={{ count: policy.getIn(['summary', 'pending_requests_count']) }} /></span>
      </div>

      <div className='filtered-notifications-banner__badge'>
        {toCappedNumber(policy.getIn(['summary', 'pending_notifications_count']))}
      </div>
    </Link>
  );
};
