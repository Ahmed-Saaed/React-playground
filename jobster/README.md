# usefel resourses

[undraw]('undraw.io')
for icons

---

## redux-tool-kit

- create the folder features/user/userSlice
- create the slice
- export the slice userSlice.reducer
- in store.js > import the slice
- in store.js configureStore

```js
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
```

- then import the store in the index.js to add the provider
- index.js

```js
import { store } from './store';
import { Provider } from 'react-redux';

root.render(
  <Provider store={store}>
    <App tab='home' />
  </Provider>
);
// how to use it in another file , register.js for example

  const {user,isLoading} = useSelector(store => store.user)
  const dispatch = useDispatch()
```

---

## how to set protected route

```js
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

function ProtectedRoute({children}) {
  const {user} = useSelector((store) => store.user);
  if(!user){
    return <Navigate to='/landing'/>
  }

  return  children;
}

export default ProtectedRoute;
// import it in app.js
    <Routes>
      <Route path='/'  element = {
        <ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>
        }>
        <Route index element={<Stats/>} />
      </Routes>
```

## how to setup the builder annotation for extra reducers

```js
 extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error..');
      });
  },

  ```

- implemnting debounce

```js
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        dispatch(handleChange({name: e.target.name, value: e.target.value}));
      }, 1300);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);
```
