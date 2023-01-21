import React from "react";
import { Form } from "react-bootstrap";

export default function Filter() {
  return (
    <div
      class="w-25 bg-light me-3 rounded shadow-sm d-flex flex-column"
      style={{ height: "625px" }}
    >
      <strong class="m-3">Filter Notifications</strong>
      <Form className="d-flex mx-3">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
      </Form>
      <div class="d-flex flex-column mb-1">
        <div class="form-check my-3">
          <strong>Groups</strong>
          <div class=" d-flex justify-content-center mt-1">
            <div class="d-flex flex-column mb-1">
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-check my-3">
          <strong>Admin</strong>
          <div class=" d-flex justify-content-center mt-1">
            <div class="d-flex flex-column mb-1">
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
              <div class="mb-1">
                <label class="form-check-label" for="defaultCheck1">
                  Email Notifications
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
