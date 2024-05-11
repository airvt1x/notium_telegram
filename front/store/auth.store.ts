import { toast } from 'vue-sonner';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | UserType>(null);
  const isLoading = ref<boolean>(false);
  const token = useCookie('token');
  const isSkeleton = ref<boolean>(true);
  const error = ref('');

  const { onLogin, getUser } = useUserAuth();

  const login = async (userInfo: { email: string; password: string }) => {
    isLoading.value = true;
    try {
      const response = await onLogin(userInfo);
      user.value = {
        email: response.data.email,
        _id: response.data._id
      };
      token.value = response.data.token;
      if (token.value) {
        navigateTo(AI_ROUTE);
      }
    } catch (err: any) {
      error.value = ErrorAuth.LOGIN_ERROR;
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };


  const logout = async () => {
    try {
      user.value = null;
      token.value = '';
      const uid = useCookie('uid');
      uid.value = null;
      await navigateTo(LOGIN_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await getUser();
      user.value = {
        _id: response.data._id,
        email: response.data.email!,
        photoUrl: response.data.photoUrl
      };
    } catch (err) {
      console.log(err);
    }
  };

  const setSkeleton = () => {
    setTimeout(() => {
      isSkeleton.value = false;
    }, 2000);
  };

  const setSkeletonOnUnmount = () => {
    isSkeleton.value = true;
  };

  return {
    user,
    error,
    token,
    isLoading,
    isSkeleton,
    login,
    logout,
    setSkeleton,
    setSkeletonOnUnmount,
    getCurrentUser
  };
});
