import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import "./Profile.css";

export default function Profile() {
  const { token } = useContext(AppContext);

  const userName = token ? JSON.parse(atob(token.split(".")[1])).Name : null;
  const userEmail = token ? JSON.parse(atob(token.split(".")[1])).Email : null;
  const userPhone = token ? JSON.parse(atob(token.split(".")[1])).Phone : null;
  const userAvatar = token
    ? JSON.parse(atob(token.split(".")[1])).PhotoUrl
    : null;

  useEffect(() => {
    if (token) {
      console.log(atob(token.split(".")[1]));
      console.log(userAvatar);
    }
  });

  return (
    <>
      {!token && <h2>Авторизуйтесь для перегляду профілю</h2>}
      {!!token && (
        <>
          <div class="text-center">
            <h1 class="display-4">Профіль користувача</h1>
          </div>

          <div class="padding">
            <div class="row container d-flex justify-content-center">
              <div class="col-xl-10 col-md-12">
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-3 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src={
                              "https://localhost:7117/Storage/Item/" +
                              userAvatar
                            }
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 class="f-w-600">{userName}</h6>
                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div class="col-sm-9">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Email</p>
                            <h6 class="text-muted f-w-400">{userEmail}</h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Phone</p>
                            <h6 class="text-muted f-w-400">{userPhone}</h6>
                          </div>
                        </div>
                        <ul class="social-link list-unstyled m-t-40 m-b-10">
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="facebook"
                              data-abc="true"
                            >
                              <i class="bi bi-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="twitter"
                              data-abc="true"
                            >
                              <i class="bi bi-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="instagram"
                              data-abc="true"
                            >
                              <i class="bi bi-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
