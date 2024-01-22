export type APIErrorResponse = {
  response: {
    data: {
      errors: [
        {
          message: string;
        },
      ];
    };
  };
};
