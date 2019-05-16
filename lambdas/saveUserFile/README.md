# save-user-file

## create

curl -X POST https://1qn7e34k46.execute-api.eu-central-1.amazonaws.com/dev/files --data '{ "file": "http://www.netlore.ru/upload/files/19/large_p19hom1f751nk1c40ml57hu2skj.jpg", "lat": "54.192985", "lng": "37.603594" }'

fetch('https://1qn7e34k46.execute-api.eu-central-1.amazonaws.com/dev/files', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  body: JSON.stringify({ file: "http://www.netlore.ru/upload/files/19/large_p19hom1f751nk1c40ml57hu2skj.jpg", lat: 54.192985, lng: 37.603594 }),
});