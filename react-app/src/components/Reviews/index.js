import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewThunk, deleteReviewThunk } from "../../store/review";
import EditReviewModal from "./EditIndex";
import { FaStar } from "react-icons/fa";
import styles from "./Reviews.module.css";

function Reviews({ item }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [stars, setStars] = useState("1");
  const itemsObj = useSelector((state) => state.items);
  const items = Object.values(itemsObj);
  const user = useSelector((state) => state.session);
  const sessionUser = useSelector((state) => state.session.user);
  // const owner = useSelector((state) => state.reviews[key].user_id)
  // console.log(owner, "EHRIEAS")

  // console.log(user,'USER')

  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);
  // console.log(reviews, "reviews");

  useEffect(() => {
    dispatch(getAllReviewThunk(id));
  }, [dispatch, id]);

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.title}>Reviews</h3>

      <div className={styles.div}>
        {reviews?.length === 0 ? (
          <div className={styles.noReviews}>
            There are no reviews at the moment, be the first to write one!
          </div>
        ) : (
          reviews?.map((review) => {
            {
              return review?.item_id === item?.id ? (
                <div className={styles.reviewDiv}>
                  <div className={styles.reviewId} key={review?.id}>
                    {/* <div className={styles.reviewDate}>
                    {review?.created_at.slice(4, 16)}
                  </div> */}

                    <div className={styles.reviewer}>
                      <img
                        className={styles.profilePicture}
                        src={review?.user?.profile_picture}
                      ></img>
                      <div className={styles.reviewDetails}>
                        <span>Review by </span>
                        {review?.user?.first_name + " "}
                        {review?.user?.last_name}
                        <span> on </span>
                        <div className={styles.reviewDate}>
                          {review?.created_at.slice(4, 16)}
                        </div>
                      </div>
                    </div>
                    <div id="starContainer">
                      {[...Array(parseInt(review?.stars))].map((star, idx) => {
                        return (
                          <FaStar
                            className={`${styles.star} active`}
                            color={"#ffcc00"}
                          />
                        );
                      })}
                      {/* <i
                        id="star"
                        className={`${styles.stars} fa-solid fa-star`}
                      ></i>

                      {review?.stars} */}
                      <div className={styles.review}>{review?.review}</div>
                    </div>
                    {/* {console.log(reviews, "REDHSAIOW")}
                {console.log(sessionUser.id, "dsawdas")} */}
                  </div>

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
          })
        )}
      </div>
    </div>
  );
}

export default Reviews;
