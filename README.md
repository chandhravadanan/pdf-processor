# PDF Processor

Backend API's to process pdf document asynchronously and generate thumbnail. Used https://www.npmjs.com/package/gm npm package to generate thumbnail for pdf document. It depends on `graphicsmagick` and `ghostscript`. Documents will be stored inside `files` directory in process started location.

# Requirements
```
Node 14
MongoDB
brew install graphicsmagick
brew install ghostscript
```

# Evnironment variables
.env file contains server side environment variables. Ideally it should not be commited in github but committed because this is test application.

# Start
```
npm i
npm start
```

# API's

Add pdf document - POST - http://localhost:8000/document/add 
```
{
    "url": "http://africau.edu/images/default/sample.pdf",
    "webhook": "http://localhost:8000/test/webhook"
}
```

Get list of documents - GET  - http://localhost:8000/documents
Sample response
```
{
    "isSuccess": true,
    "documents": [
        {
            "status": 1,
            "_id": "60c48e354b078c11e7510504",
            "file": "60c48e344b078c11e7510503", //pdf document fileId
            "createdAt": "2021-06-12T10:36:37.125Z",
            "updatedAt": "2021-06-12T10:36:37.343Z",
            "thumbnail": "60c48e354b078c11e7510505" //thumbnail document fileId
        }
    ]
}
```

Get file - GET  - http://localhost:8000/file/<fileId>
`sample - GET - http://localhost:8000/file/60c48e354b078c11e7510505`


