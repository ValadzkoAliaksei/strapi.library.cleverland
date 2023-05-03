export const getRating = (comments: any): number | null => {
  return comments?.data.length
    ? Math.round(
        (comments.data?.reduce((acc: number, { attributes: { rating } }) => {
          acc = acc + rating;
          return acc;
        }, 0) /
          comments.data.length) *
          100
      ) / 100
    : null;
};

export const getRatingUser = (comments: any): number | null => {
  const rating = comments?.length
    ? Math.round(
        (comments?.reduce((acc: number, { rating }) => {
          acc = acc + rating;
          return acc;
        }, 0) /
          comments.length) *
          100
      ) / 100
    : null;

  return rating;
};
