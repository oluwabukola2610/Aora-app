 export const validatePassword = (password: string) => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegExp.test(password)) {
        return false;
    }
    return true;
  };