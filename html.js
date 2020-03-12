module.exports = function (title,content){

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>${title}</title>
    <style>
    div a{      
        margin:15px;
        font-size: 20px;
        text-decoration: none;
    }
    div a:hover{
        text-decoration-line: underline;
    }
    
    </style>
</head>
<body>
    <header>
        <h1>Mitt flöde</h1>
    </header>
    <div>
    <a href="profil"> Profil </a>
    <a href="login"> Logga ut </a>
    <a href="nytt"> Nytt inlägg </a>
    </div>
    <main>
    ${content}
    </main>
    <footer>
        <h4><a href="index"> Tillbaka till toppen </a></h4>
    </footer>
    
    <script src="main.js"></script>
</body>
</html>
    `;

}