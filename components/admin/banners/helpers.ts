import { navigateTo } from "common/helpers";
import { NextRouter } from "next/router";
import { updateAdvertisement, updateSlides } from "redux/slicers/bannersSlicer";
import { AppDispatch } from "redux/store";
import { Page } from "routes/constants";

const handleGetSlideImage = (slideNum, images) => {
    return images.find(image => image.uid === slideNum)?.name
}

const handleSlidesDataFormatter = (form, images) => {
    const result = Object.values(form).reduce((accum: any[], link, index) => {
        return accum.concat({
            image: handleGetSlideImage(index + 1, images),
            link
        });
    }, []);

    return result;
}

export const handleFormSubmitBanner =
    (router: NextRouter,
        dispatch: AppDispatch,
        image: any,
        bannerIs: string,
        id?: number
    ) => async (form) => {
        let isSaved: any
        switch (bannerIs) {
            case 'advertisement':
                isSaved = await dispatch(updateAdvertisement({
                    ...form,
                    image: image[0]?.url?.split('/api/images/')[1],
                    id
                }))
                break
            case 'slide':
                const slidesData = await handleSlidesDataFormatter(form, image)
                console.log(slidesData)
                isSaved = dispatch(updateSlides(slidesData))
                break
        }
        if (!isSaved.error) {
            navigateTo(router, Page.ADMIN_BANNERS)();
        }


    };

export const handleGetImage = (uid: number, imageList): {
    name: string,
    url: string,
    uid: string
}[] | [] => {
    // console.log(imageList)
    const image = imageList.filter((image) => image.uid === uid)
    if (image) {
        return image
    }
    return []
}

export const handleCheckFalsyValues = (imageList, link1, link2, link3, link4, link5): boolean => {
    return (imageList.length !== 5 || !link1 || !link2 || !link3 || !link4 || !link5)
}

