import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { getUserAuthData, userActions } from '@/entities/User';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );

        if (!response.data) {
            throw new Error();
        }

        // Update the users array with the new avatar
        await extra.api.patch(`/users/${response.data.id}`, { avatar: response.data.avatar });

        const authData = getUserAuthData(getState());
        if (authData && authData.id === response.data.id) {
            thunkApi.dispatch(
                userActions.setAuthData({
                    ...authData,
                    ...response.data,
                }),
            );
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
