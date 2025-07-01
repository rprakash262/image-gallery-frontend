import { CallAPI } from "../utils/callApi";

const baseApiUrl = process.env.API_SERVER_URL;

export const userApi = {
  register: async function (email: string, password: string) {
    const url = new URL(`${baseApiUrl}/users/register`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        email,
        password,
      }),
    });
    // const response = await fetch(
    //   "http://localhost:5000/api/v1/users/register",
    //   {
    //     method: "post",
    //     body: JSON.stringify({
    //       name,
    //       email,
    //       password,
    //     }),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // );

    // const jsonResponse = await response.json();

    // return jsonResponse;
  },
  login: async function (email: string, password: string) {
    const url = new URL(`${baseApiUrl}/users/login`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        email,
        password,
      }),
    });

    // const response = await fetch("http://localhost:5000/api/v1/users/login", {
    //   method: "post",
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   credentials: "include",
    // });

    // const jsonResponse = await response.json();

    // return jsonResponse;
  },
};

// export const userApi = {
//   register: async function (email: string, password: string) {
//     const response = await fetch(
//       "http://localhost:5000/api/v1/users/register",
//       {
//         method: "post",
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );

//     const jsonResponse = await response.json();

//     return jsonResponse;
//   },
//   login: async function (email: string, password: string) {
//     const response = await fetch("http://localhost:5000/api/v1/users/login", {
//       method: "post",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         "content-type": "application/json",
//       },
//       credentials: "include",
//     });

//     const jsonResponse = await response.json();

//     return jsonResponse;
//   },
// };
