# Instagram Scraper

## Before Start

- prefer install virtual environment to your Mac and run scripts into it
- install the [Python Instagram Scraper](https://github.com/rarcega/instagram-scraper) into your virtual env
  ```
  workon <you_env_name>
  pip3 install instagram-scraper
  ```

## Start Using

- configure `locations.js` file
- start photos data loading
  ```
  node index.js
  ```
- result will be at `result.json` file

## Result Interface

`result.json`

```js
{
  id: number | string,
  display_url: string,
  preview_url: string,
  owner_id: number | string,
  taken_at_timestamp: number | string,
  location: {
    lat: number,
    lng: number,
    name: string,
    instagramId: number
  }
}
```