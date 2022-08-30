import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Reaction } from 'common/enums/reaction.enum';
import { TProductInfoState } from 'redux/types';
import { Comment, CommentReaction, CommentService, CreateCommentDTO, Product, ProductService, Review, ReviewDTO, ReviewReaction, ReviewService } from 'swagger/services';
import {
  getErrorMassage, handleChangePending, handleError, handlePending
} from '../../../common/helpers';

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'productInfo/fetchProduct',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.findProductByUrl({ url: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createReviewReaction = createAsyncThunk<
  ReviewReaction,
  { userId: string, reviewId: string, reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createReviewReaction',
  async function ({ userId, reviewId, reaction }, { rejectWithValue }): Promise<any> {
    try {
      const created = await ReviewService.createReviewReaction({
        body: {
          userId,
          reviewId,
          reaction,
        },
      });

      return created;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteReviewReaction = createAsyncThunk<
  ReviewReaction,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteReviewReaction',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteReviewReaction({ reactionId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createCommentReaction = createAsyncThunk<
  CommentReaction & { reviewId: string },
  { userId: string, reviewId: string, commentId: string, reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createCommentReaction',
  async function ({ userId, reviewId, commentId, reaction }, { rejectWithValue }): Promise<any> {
    try {
      const created = await ReviewService.createCommentReaction({
        body: {
          userId,
          commentId,
          reaction,
        },
      });

      return {
        ...created,
        reviewId: reviewId
      };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCommentReaction = createAsyncThunk<
  CommentReaction & { reviewId: string },
  { reviewId: string, id: string },
  { rejectValue: string }
>(
  'productInfo/deleteCommentReaction',
  async function ({ reviewId, id }, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteCommentReaction({ reactionId: id });

      return { ...removed, reviewId };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteReview = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteReview',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteReview({ reviewId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteComment = createAsyncThunk<
  Comment,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteComment',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteComment({ commentId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createReview = createAsyncThunk<
  Review,
  ReviewDTO,
  { rejectValue: string }
>(
  'productInfo/createReview',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.createReview({ body: payload });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createComment = createAsyncThunk<
  Comment,
  CreateCommentDTO,
  { rejectValue: string }
>(
  'productInfo/createComment',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const removed = await CommentService.createComment({ body: payload });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProductInfoState = {
  product: undefined,
  loading: false,
  saveLoading: false,
};

const productInfoSlicer = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    clearProductInfo(state) {
      state.product = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchProduct.pending, handlePending)
      .addCase(
        fetchProduct.fulfilled,
        (state, action) => {
          state.product = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchProduct.rejected, handleError)
      //createReviewReaction
      .addCase(createReviewReaction.pending, handleChangePending)
      .addCase(
        createReviewReaction.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.reviewId);
          review?.reactions?.push(action.payload);
          console.log(JSON.parse(JSON.stringify(review)), action.payload.reviewId);
          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(createReviewReaction.rejected, handleError)
      //deleteReviewReaction
      .addCase(deleteReviewReaction.pending, handleChangePending)
      .addCase(
        deleteReviewReaction.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.reviewId);
          if (review?.reactions) {
            review.reactions = review?.reactions?.filter(reaction => reaction.id != action.payload.id);
          }
          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(deleteReviewReaction.rejected, handleError)
      //createCommentReaction
      .addCase(createCommentReaction.pending, handleChangePending)
      .addCase(
        createCommentReaction.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.reviewId);
          const comment = review?.comments?.find(comment => comment.id == action.payload.commentId);

          if (comment?.reactions) {
            comment?.reactions?.push(action.payload)
          }

          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(createCommentReaction.rejected, handleError)
      //deleteCommentReaction
      .addCase(deleteCommentReaction.pending, handleChangePending)
      .addCase(
        deleteCommentReaction.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.reviewId);
          const comment = review?.comments?.find(comment => comment.id == action.payload.commentId);

          if (comment?.reactions) {
            comment.reactions = comment?.reactions?.filter(reaction => reaction.id != action.payload.id);
          }

          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(deleteCommentReaction.rejected, handleError)
      //deleteReview
      .addCase(deleteReview.pending, handleChangePending)
      .addCase(
        deleteReview.fulfilled,
        (state, action) => {
          if (state.product?.reviews) {
            state.product.reviews = state.product?.reviews.filter(review => review.id != action.payload.id);
          }

          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(deleteReview.rejected, handleError)
      //deleteComment
      .addCase(deleteComment.pending, handleChangePending)
      .addCase(
        deleteComment.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.review!.id);
          if (review?.comments) {
            review.comments = review?.comments.filter(comment => comment.id != action.payload.id);
          }

          state.saveLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(deleteComment.rejected, handleError)
      //createReview
      .addCase(createReview.pending, handleChangePending)
      .addCase(
        createReview.fulfilled,
        (state, action) => {
          if (state.product?.reviews) {
            state.product.reviews.push(action.payload);
          }
          state.saveLoading = false;
        },
      )
      .addCase(createReview.rejected, handleError)
      //createComment
      .addCase(createComment.pending, handleChangePending)
      .addCase(
        createComment.fulfilled,
        (state, action) => {
          const review = state.product?.reviews?.find(review => review.id == action.payload.review?.id);
          if (review?.comments) {
            review.comments.push(action.payload);
          }
          state.saveLoading = false;
        },
      )
      .addCase(createComment.rejected, handleError)
  },
});

export const { clearProductInfo } = productInfoSlicer.actions;

export default productInfoSlicer.reducer;
