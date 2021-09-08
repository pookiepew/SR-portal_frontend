import { useState } from 'react';

const usePermission = (user, feature, access) => {
  const [hasCorrectPermission, setHasCorrectPermission] = useState(false);

  for (let i = 0; user.roles.length > i; i++) {
    if (user.roles[i].feature === 'admin') {
      setHasCorrectPermission(true);
      return;
    }
    if (user.roles[i].feature === feature) {
      if (user.roles[i].access.includes(access)) {
        setHasCorrectPermission(true);
        return;
      }
    }
  }

  return {
    hasCorrectPermission,
  };
};

export default usePermission;
