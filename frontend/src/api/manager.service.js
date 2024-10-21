import api from './api';
export const getAllManagers = () => {
    return api.get('/managers');
  };
  