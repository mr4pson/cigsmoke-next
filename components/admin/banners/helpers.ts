import { navigateTo } from "common/helpers";
import { NextRouter } from "next/router";
import { updateAdvertisement } from "redux/slicers/bannersSlicer";
import { AppDispatch } from "redux/store";
import { Page } from "routes/constants";

export const handleFormSubmitBanner =
  (router: NextRouter, 
    dispatch: AppDispatch, 
    image: any, 
    id: number, 
    bannerIs: string) => async (form) => {
        console.log(form)
        switch(bannerIs) {
            case 'advertisement':
                const isSaved: any = dispatch(updateAdvertisement({
                    ...form,
                    image: image[0]?.url?.split('/api/images/')[1],
                    id
                }))
                if (!isSaved.error) {
                    navigateTo(router, Page.ADMIN_BANNERS)();
                }
                return;
        }


  };