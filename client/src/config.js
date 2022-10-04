const config = {
  nodeEnv: process.env["NODE_ENV"] || "development",
  validation: {
    email: {
      regexp: {
        emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
    },
    password: {
      regexp: {
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      }
    },
    image: {
      regexp: {
        imageRegex: /(https?:\/\/.*\.(?:png|jpg))/i,
      }
    },
    url: {
      regexp: {
        urlRegex: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i
      }
    }
  },
};

export default config;
