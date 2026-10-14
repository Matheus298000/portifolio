@echo off
chcp 65001 >nul
title Publicar Portfólio no GitHub Pages - Matheus Giovanni
cls
echo =====================================================================
echo    PUBLICADOR AUTOMÁTICO DO PORTFÓLIO - MATHEUS GIOVANNI
echo =====================================================================
echo.

set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
set "GH_CMD=C:\Program Files\GitHub CLI\gh.exe"

if not exist "%GIT_CMD%" (
    set "GIT_CMD=git"
)

if not exist "%GH_CMD%" (
    set "GH_CMD=gh"
)

echo [1/4] Verificando conexão e autenticação com o GitHub...
echo.
"%GH_CMD%" auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Você ainda não está conectado no GitHub CLI neste computador.
    echo.
    echo Vamos conectar sua conta agora com segurança:
    echo 1. Selecione 'GitHub.com'
    echo 2. Selecione 'HTTPS'
    echo 3. Em 'Authenticate Git with your GitHub credentials?' pressione 'Y' (Sim)
    echo 4. Selecione 'Login with a web browser' e confirme o código no seu navegador.
    echo.
    pause
    "%GH_CMD%" auth login
    echo.
)

echo [2/4] Preparando arquivos e commit local...
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "Publicação do Portfólio de Matheus Giovanni" >nul 2>&1
"%GIT_CMD%" branch -M main

echo.
echo =====================================================================
echo  ESCOLHA COMO DESEJA PUBLICAR NO GITHUB:
echo =====================================================================
echo.
echo  [1] Publicar como site principal: Matheus298000.github.io (RECOMENDADO)
echo      -> O link do seu site será: https://Matheus298000.github.io/
echo.
echo  [2] Publicar como repositório secundário: portfolio
echo      -> O link do seu site será: https://Matheus298000.github.io/portfolio/
echo.
echo  [3] Já criei um repositório no GitHub e quero colar a URL
echo.
set /p OPCAO="Digite a opção desejada (1, 2 ou 3) e pressione ENTER: "

if "%OPCAO%"=="1" (
    echo.
    echo Criando repositório público 'Matheus298000.github.io' no GitHub...
    "%GH_CMD%" repo create Matheus298000.github.io --public --source=. --remote=origin --push
    echo.
    echo Configurando GitHub Pages...
    "%GH_CMD%" api -X POST repos/Matheus298000/Matheus298000.github.io/pages -f source="{\"branch\":\"main\",\"path\":\"/\"}" >nul 2>&1
    echo.
    echo =====================================================================
    echo  SUCESSO! SEU SITE FOI PUBLICADO!
    echo =====================================================================
    echo  Link do seu portfólio: https://Matheus298000.github.io/
    echo  (Pode levar de 1 a 2 minutos para o GitHub finalizar a primeira publicação)
    echo =====================================================================
    pause
    start https://Matheus298000.github.io/
    exit /b
)

if "%OPCAO%"=="2" (
    echo.
    echo Criando repositório público 'portfolio' no GitHub...
    "%GH_CMD%" repo create portfolio --public --source=. --remote=origin --push
    echo.
    echo Configurando GitHub Pages...
    "%GH_CMD%" api -X POST repos/Matheus298000/portfolio/pages -f source="{\"branch\":\"main\",\"path\":\"/\"}" >nul 2>&1
    echo.
    echo =====================================================================
    echo  SUCESSO! SEU SITE FOI PUBLICADO!
    echo =====================================================================
    echo  Link do seu portfólio: https://Matheus298000.github.io/portfolio/
    echo  (Pode levar de 1 a 2 minutos para o GitHub finalizar a primeira publicação)
    echo =====================================================================
    pause
    start https://Matheus298000.github.io/portfolio/
    exit /b
)

if "%OPCAO%"=="3" (
    echo.
    set /p REPO_URL="Cole a URL do seu repositório (ex: https://github.com/Matheus298000/portfolio.git): "
    "%GIT_CMD%" remote remove origin >nul 2>&1
    "%GIT_CMD%" remote add origin %REPO_URL%
    "%GIT_CMD%" push -u origin main
    echo.
    echo Repositório enviado com sucesso!
    echo Lembre-se de ativar o Pages em: Settings - Pages - Branch: main.
    pause
    exit /b
)

echo Opção inválida. Execute novamente.
pause
