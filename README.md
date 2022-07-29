## 🚀 Quick start

1.  **Backend: Django**

    Original data from: [STEPBible](https://github.com/STEPBible/STEPBible-Data)

    See backend/api/Tyndale for data cleaning.

    ```shell
    cd backend
    # create python virtual environment
    pip install -r requirements.txt
    cd scripts
    bash startOver.sh
    ```

    View [graphql site](http://0.0.0.0:5000/graphql)
    View [admin site](http://0.0.0.0:5000/admin)
    Superuser was created in the startOver.sh script.

2.  **Frontend: Gatsby**

    ```shell
    # in another terminal (install gatsby CLI first if you need to)
    cd frontend
    npm install
    bash dev.sh
    ```

    View [gatsby site](http://0.0.0.0:8000)
