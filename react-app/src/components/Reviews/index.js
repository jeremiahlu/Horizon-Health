import { useSelect } from "@mui/base";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewThunk, deleteReviewThunk } from "../../store/review";
import EditReviewModal from "./EditIndex";
import styles from "./Reviews.module.css";

function Reviews({ item }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const itemsObj = useSelector((state) => state.items);
  const items = Object.values(itemsObj);
  const user = useSelector((state) => state.session);
  const sessionUser = useSelector((state) => state.session.user);
  // const owner = useSelector((state) => state.reviews[key].user_id)
  // console.log(owner, "EHRIEAS")

  // console.log(user,'USER')

  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);
  // console.log(reviews, 'reviews')

  useEffect(() => {
    dispatch(getAllReviewThunk(id));
  }, [dispatch, id]);

  return (
    <div className={styles.reviewsContainer}>
      <h3>Reviews</h3>
      <div className={styles.div}>
        {reviews?.map((review) => {
          {
            return review?.item_id === item?.id ? (
              <div className={styles.reviewId} key={review?.id}>
                <div className={styles.review} key={review?.id}>
                  {review?.review}
                </div>
                {/* <div className={styles.reviewDate}>{review?.createdAt.slice(0, 10)}</div> */}
                <div id="starContainer">
                  <i id="star" className={`${styles.stars} fa-solid fa-star`}>
                    {" "}
                  </i>

                  {review?.stars}
                </div>
                <div className={styles.reviewer}>
                  {/* {console.log(review,'REVIEW')} */}
                  {/* {review?.userId?.firstName + " "}
                  {review?.userId?.lastName} */}
                </div>
                {/* {console.log(reviews, "REDHSAIOW")}
                {console.log(sessionUser.id, "dsawdas")} */}

                {review?.user_id === sessionUser?.id && (
                  <div className={styles.edit}>
                    <EditReviewModal review={review} />
                    <i
                      className={`${styles.delete} fa-light fa-x`}
                      onClick={async (e) => {
                        e.preventDefault();
                        await dispatch(deleteReviewThunk(review));
                      }}
                    ></i>
                  </div>
                )}
              </div>
            ) : (
              <></>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Reviews;
