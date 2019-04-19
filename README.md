# eventder
The Eventder

## For Python Virtual End

```
workon cv
```

## For scrapper

[instagram-scrapper](https://github.com/rarcega/instagram-scraper)

To find a Instagram location-id
```
instagram-scraper --search-location Tula
```

To download 4 photos from location - Tula, Iskra

```
instagram-scraper --location 1210536975718297 --maximum 4 -u <your-user-name> -p <your-password>
```

To download only metadata use the `--media-metadata --media-types none`

```
instagram-scraper --location 1210536975718297 --maximum 4 -u <your-user-name> -p <your-password> --media-metadata --media-types none
```