let numberOfCircle = 0;
        let numberOfRectangle = 0; 
        let numberOfTriangle = 0;

        let selectedShape = null;
        let isDrawing = false;
        let mode = "draw";

        function changeMode() {
            // console.log(mode);
            if (mode == "draw") {
                mode = "move";
                document.getElementById("showMode").innerHTML = "move";
            } else if (mode == "move") {
                mode = "suppr";
                document.getElementById("showMode").innerHTML = "suppr";
            } else if (mode == "suppr") {
                mode = "draw";
                document.getElementById("showMode").innerHTML = "draw";
                
            }
            // console.log(mode);
        }

        const drawingAreaEl = document.getElementById("drawingArea");
        const previewCanvas = document.getElementById("previewCanvas");
        const previewCtx = previewCanvas.getContext("2d");

        function resizePreviewCanvas() {
            previewCanvas.width  = drawingAreaEl.offsetWidth;
            previewCanvas.height = drawingAreaEl.offsetHeight;
        }
        window.addEventListener("load", resizePreviewCanvas);
        window.addEventListener("resize", resizePreviewCanvas);

        function drawPreview(x1, y1, x2, y2) {
            previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

            const left   = Math.min(x1, x2);
            const top    = Math.min(y1, y2);
            const width  = Math.abs(x2 - x1);
            const height = Math.abs(y2 - y1);
            if (width < 2 || height < 2) return;

            const color = $("input[type='color']").val();
            previewCtx.strokeStyle = color;
            previewCtx.setLineDash([6, 3]);
            previewCtx.lineWidth = 1.5;
            previewCtx.beginPath();

            if (selectedShape === "rectangle") {
                previewCtx.rect(left, top, width, height);

            } else if (selectedShape === "circle") {
                const cx  = left + width / 2;
                const cy  = top  + height / 2;
                const min = Math.min(width, height);
                previewCtx.arc(cx, cy, min / 2, 0, 2 * Math.PI);

            } else if (selectedShape === "triangle") {
                previewCtx.moveTo(left + width / 2, top);
                previewCtx.lineTo(left + width, top + height);
                previewCtx.lineTo(left, top + height);
                previewCtx.closePath();
            }

            previewCtx.stroke();
            previewCtx.setLineDash([]); // réinitialise pour les autres dessins
        }

        function clearPreview() {
            previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        }

        function initSelectionShapes() {
            setTimeout(() => {
                const shapes = document.querySelectorAll('#selectionArea .shape');
                shapes.forEach(shape => {
                    shape.width  = shape.offsetWidth;
                    shape.height = shape.offsetHeight;
                });
                drawingCircle(document.getElementById("circle" + numberOfCircle));
                drawingRectangle(document.getElementById("rectangle" + numberOfRectangle));
                drawingTriangle(document.getElementById("triangle" + numberOfTriangle));
            }, 1);
        }

        function drawingCircle(c) {
            var ctx = c.getContext("2d");
            var canvaWidth = c.width;
            var canvaHeight = c.height;
            var min = Math.min(canvaWidth, canvaHeight);
            const color = $("input[type='color']").val();
            ctx.clearRect(0, 0, canvaWidth, canvaHeight);
            ctx.beginPath();
            ctx.arc(canvaWidth / 2, canvaHeight / 2, min / 2, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawingRectangle(c) {
            var ctx = c.getContext("2d");
            var canvaWidth = c.width;
            var canvaHeight = c.height;
            const color = $("input[type='color']").val();
            ctx.clearRect(0, 0, canvaWidth, canvaHeight);
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvaWidth, canvaHeight);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawingTriangle(c) {
            var ctx = c.getContext("2d");
            var canvaWidth = c.width;
            var canvaHeight = c.height;
            const color = $("input[type='color']").val();
            ctx.clearRect(0, 0, canvaWidth, canvaHeight);
            ctx.beginPath();
            ctx.moveTo(canvaWidth / 2, 0);
            ctx.lineTo(canvaWidth, canvaHeight);
            ctx.lineTo(0, canvaHeight);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        window.addEventListener('load', initSelectionShapes);

        let leftUpCoords    = { x: 0, y: 0 }; 
        let RightDownCoords = { x: 0, y: 0 };
        function toRelative(clientX, clientY) {
            const offset = $("#drawingArea").offset();
            return {
                x: clientX - offset.left,
                y: clientY - offset.top
            };
        }

        function createCanva() {
            const p1 = toRelative(leftUpCoords.x,    leftUpCoords.y);
            const p2 = toRelative(RightDownCoords.x, RightDownCoords.y);

            const width  = Math.abs(p2.x - p1.x); 
            const height = Math.abs(p2.y - p1.y);
            const left   = Math.min(p1.x, p2.x);
            const top    = Math.min(p1.y, p2.y);

            switch (selectedShape) {
                case "rectangle": 
                    numberOfRectangle++;
                    $("#drawingArea").append(
                        "<canvas id='rectangle" + numberOfRectangle + "' class='shape'" +
                        " width='" + width + "' height='" + height + "'" +
                        " style='left:" + left + "px; top:" + top + "px;'>" +
                        "Your browser does not support the HTML canvas tag.</canvas>"
                    ); 
                    drawingRectangle(document.getElementById("rectangle" + numberOfRectangle));
                    break; 
                case "circle": 
                    numberOfCircle++; 
                    $("#drawingArea").append(
                        "<canvas id='circle" + numberOfCircle + "' class='shape'" +
                        " width='" + width + "' height='" + height + "'" +
                        " style='left:" + left + "px; top:" + top + "px;'>" +
                        "Your browser does not support the HTML canvas tag.</canvas>"
                    ); 
                    drawingCircle(document.getElementById("circle" + numberOfCircle)); 
                    break; 
                case "triangle": 
                    numberOfTriangle++; 
                    $("#drawingArea").append(
                        "<canvas id='triangle" + numberOfTriangle + "' class='shape'" +
                        " width='" + width + "' height='" + height + "'" +
                        " style='left:" + left + "px; top:" + top + "px;'>" +
                        "Your browser does not support the HTML canvas tag.</canvas>"
                    ); 
                    drawingTriangle(document.getElementById("triangle" + numberOfTriangle)); 
                    break;
            }
        }

        $("#rectangle0").click(function() {
            selectedShape = "rectangle";
        });

        $("#circle0").click(function() {
            selectedShape = "circle";
        });

        $("#triangle0").click(function() {
            selectedShape = "triangle";
        });
        
        let selectedShapeToMove = null;
        let initClick = { x: 0, y: 0 };
        let finalClick = { x: 0, y: 0 };
        $(document).on("click", ".shape", function() {
            if (mode == "draw") {
                if ($(this).parent().attr('id') === 'selectionArea') return;
                if (isDrawing) return; 
                // changer la couleur
                const id     = this.id;
                if (id.startsWith("circle")) {
                    drawingCircle(document.getElementById(id))
                } else if (id.startsWith("rectangle")) {
                    drawingRectangle(document.getElementById(id))
                } else if (id.startsWith("triangle")) {
                    drawingTriangle(document.getElementById(id))
                }

            } else if (mode == "move") {
                // ne pas changer la couleur
            } else if (mode == "suppr") {
                if ($(this).parent().attr('id') === 'selectionArea') return;
                $(this).remove()
            }
        });
        
        $(document).on("mousedown", ".shape", function(event) {
            if (mode == "move") {
                if ($(this).parent().attr('id') === 'selectionArea') return;
                selectedShapeToMove = this;
                initClick.x = event.clientX;
                initClick.y = event.clientY;
            }
        })

        $("#drawingArea").mousedown(function(event) { 
            if (mode == "draw") {
                if (selectedShape === null) return;
                isDrawing = true;
                leftUpCoords.x = event.clientX; 
                leftUpCoords.y = event.clientY; 
            } else if (mode == "move") {
                // voir fonction $(document).on("mousedown", ".shape", function(event) {
            }
        });

        $("#drawingArea").mousemove(function(event) {
            if (mode == "draw") {
                if (!isDrawing || selectedShape === null) return;
    
                const p1 = toRelative(leftUpCoords.x, leftUpCoords.y);
                const p2 = toRelative(event.clientX,  event.clientY);
                drawPreview(p1.x, p1.y, p2.x, p2.y);
            }
        });

        $("#drawingArea").mouseup(function(event) {
            if (mode=="draw") {
                if (!isDrawing) return;
                isDrawing = false;
                clearPreview();
    
                const distance = Math.sqrt(
                    Math.pow(leftUpCoords.x - event.clientX, 2) +
                    Math.pow(leftUpCoords.y - event.clientY, 2)
                );
    
                if (selectedShape !== null && distance > 10) {
                    RightDownCoords.x = event.clientX; 
                    RightDownCoords.y = event.clientY; 
                    createCanva(); 
                }
            } else if (mode == "move") {
                finalClick.x = event.clientX; 
                finalClick.y = event.clientY;
                moveShape();
            }
        });

        function moveShape() {
            if (selectedShapeToMove === null) return;
            // console.log("moveing")
            dx = initClick.x - finalClick.x;
            dy = initClick.y - finalClick.y;

            left = parseInt($(selectedShapeToMove).css("left"))
            currentTop = parseInt($(selectedShapeToMove).css("top"))
            // console.log("dx : "+dx+" dy : "+dy);
            // console.log(selectedShapeToMove)
            // console.log("INIT left : "+left+" top : "+currentTop)
            $(selectedShapeToMove).css({
                left: (left - dx) + "px",
                top:  (currentTop  - dy) + "px"
            });
            // console.log("INIT left : "+parseInt($(selectedShapeToMove).css("left"))+" top : "+parseInt($(selectedShapeToMove).css("top")))
            
            selectedShapeToMove = null;
            initClick = { x: 0, y: 0 };
            finalClick = { x: 0, y: 0 };
        }

        $("#drawingArea").mouseleave(function() {
            if (isDrawing) {
                isDrawing = false;
                clearPreview();
            }
        });