<!DOCTYPE html>
<html lang="pt-br">

<style>

</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <title>Login - DIXI Pedidos</title>
</head>

<body>
    <div id="login-container">
        <div id="form-login-container" class="text-center">
            <div>
                <img src="assets/img/dixi-logo.png" class="img-fluid">
                <h4>Sistema de Pedidos</h4>
            </div>
            <form id="form-login">
                <div class="form-floating mb-3">
                    <input type="username" class="form-control" id="username" placeholder="Usuário">
                    <label for="username">Nome de usuário</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Senha">
                    <label for="password">Senha</label>
                </div>
                <button class="btn btn-primary" type="submit">Login</button>
            </form>
            <div class="row justify-content-center">
                <div class="error-message-login white"></div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.querySelector("#form-login");

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const username = document.querySelector("#username").value;
                const password = document.querySelector("#password").value;
                let errorMessageLogin = document.querySelector(".error-message-login");

                const urlData = new URLSearchParams({
                    username,
                    password
                });

                fetch('server/Auth.php', {
                        method: 'POST',
                        body: urlData.toString(),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            location.href = "dashboard.php";
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            })
        })
    </script>
</body>

</html>