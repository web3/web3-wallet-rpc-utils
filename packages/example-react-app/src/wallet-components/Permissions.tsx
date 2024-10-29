import { GetPermissions } from './GetPermissions';
import { RequestPermissions } from './RequestPermissions';
import { RevokePermissions } from './RevokePermissions';

export function Permissions() {
  return (
    <div>
      <h4>Request, get and revoke permissions</h4>
      <RequestPermissions />
      <GetPermissions />
      <RevokePermissions />
    </div>
  );
}
