exports.handler = (event, context, callback) => {
  // modify response by intercepting CloudFront Origin Response event
  let response = event.Records[0].cf.response;
  const headers = response.headers;

  // set HTTP Security headers or other custom headers (check the AWS docs for limitations)
  headers['content-security-policy'] = [
    {
      key: 'Content-Security-Policy',
      value:
        "default-src 'none'; script-src 'self' gc.zgo.at; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data: c19at.goatcounter.com; media-src 'none'; frame-src 'none'; font-src 'self'; connect-src 'self'",
    },
  ];

  headers['x-content-type-options'] = [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
  ];

  headers['x-frame-options'] = [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
  ];

  headers['x-xss-protection'] = [
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
  ];

  headers['referrer-policy'] = [
    {
      key: 'Referrer-Policy',
      value: 'same-origin',
    },
  ];

  callback(null, response);
};
