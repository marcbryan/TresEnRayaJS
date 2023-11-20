// Cuando el documento este listo...
$(document).ready(function () {
    // Matriz del tablero
    var board = [['', '', ''], ['', '', ''], ['', '', '']];
    var turn = 1;

    var jugador1 = { number: 1, char: 'X', color: "red" };
    var jugador2 = { number: 2, char: 'O', color: "blue" };

    // Empezará el jugador 1
    var jugadorActual = jugador1;

    assignPlayerData();
    
    createBoard();

    // Evento onclick de las casillas del tablero 
    $(".row > .square").click(function (e) {
        let span = $(this).find("span");

        let coordX = span.data("coordX");
        let coordY = span.data("coordY");

        let char = board[coordX][coordY];

        if (board[coordX][coordY] == "")
        {
            span.text(jugadorActual.char);
            span.addClass(jugadorActual.color);
    
            board[coordX][coordY] = jugadorActual.char;

            if (turn == 9)
                console.log("final");

            if (haGanado(jugadorActual.char))
                showAlert("Enhorabuena!", "Ha ganado el jugador " + jugadorActual.number + "!");
            else
            {
                changePlayer();
                assignPlayerData();
            }

            turn++;
        }
        else 
        {
            let alert = $(".alert-warning");
            if (alert.length == 0)
            {
                // Creamos la alerta
                $("<div class='alert alert-warning alert-dismissible' role='alert'>" +
                "   <div>Esta casilla ya ha sido seleccionada</div>" +
                "   <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>" +
                "</div>").insertBefore(".container");
            }
        }
    });

    // Evento onclick del botón Aceptar del modal
    $("#modal .modal-footer > button").click(function (e) {
        // Refrescar la página
        window.location.href = window.location.href;
    });

    // Funciones
    function createBoard()
    {
        let container = $("div.container > .d-flex.flex-column");
    
        for (let i = 0; i < 3; i++)
        {
            container.append("<div class='row'></div>");
            let row = $("div.container > .d-flex.flex-column > .row:last-child");

            for (let j = 0; j < 3; j++)
            {
                row.append("<div class='square d-flex justify-content-center align-items-center'><span></span></div>");
                let span = row.find(".square:last-child > span")
                span.data("coordX", i);
                span.data("coordY", j);
            }
        }
    }

    function changePlayer()
    {
        if (jugadorActual == jugador1)
            jugadorActual = jugador2;
        else
            jugadorActual = jugador1;
    }

    function assignPlayerData()
    {
        $("#numJugador").text(jugadorActual.number);
        let char = $("#charFigura");
        char.text(jugadorActual.char);
        char.removeClass();
        char.addClass(jugadorActual.color);
    }

    function haGanado(charJugador)
    {
        let haGanado;
        let length = board.length;
            
        // Comprobaciones horizontales            
        for (i = 0; i < length; i++)
        {
            haGanado = true;
            for (j = 0; j < length; j++)
            {
                if (board[i][j] != charJugador)
                {
                    haGanado = false;
                    // Hacemos un break para pasar a la siguiente combinación, ya que esta no se cumple
                    break;
                }
            }

            if (haGanado)
                return true;
        }

        // Comprobaciones verticales
        for (i = 0; i < length; i++)
        {
            haGanado = true;
            for (j = 0; j < length; j++)
            {
                if (board[j][i] != charJugador)
                {
                    haGanado = false;
                    // Hacemos un break para pasar a la siguiente combinación, ya que esta no se cumple
                    break;
                }
            }

            if (haGanado)
                return true;
        }

        // Comprobaciones diagonales

        // Primera diagonal
        haGanado = true;
        // Empezamos desde la primera casilla de la primera fila
        let posicion = 0;

        for (i = 0; i < length; i++)
        {                
            if (board[i][posicion] != charJugador)
            {
                haGanado = false;
                // Hacemos un break para pasar a la siguiente combinación, ya que esta no se cumple
                break;
            }
            // Le sumamos 1 a la coordenada Y para seguir con la diagonal 
            posicion++;
        }

        if (haGanado)
            return true;

        // Segunda diagonal
        haGanado = true;
        // Comenzaremos desde la ultima casilla de la primera fila
        posicion = length - 1;

        for (i = 0; i < length; i++)
        {
            if (board[i][posicion] != charJugador)
            {
                haGanado = false;
                // Hacemos un break para pasar a la siguiente combinación, ya que esta no se cumple
                break;
            }
            // Le restamos 1 a la coordenada Y para seguir con la diagonal 
            posicion--;
        }

        if (haGanado)
            return true;

        // Hemos acabado con las comprobaciones, si se llega hasta aqui no se cumple ninguna y, por lo tanto, no ha ganado nadie
        return false;    
    }

    function showAlert(title, message) 
    {
        $("#modalLabel").text(title);
        $(".modal-body").html(message);
        $("#btnShowModal").trigger("click");
    }
});