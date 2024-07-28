document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("damasTabuleiro");
    const placarBrancas= document.getElementById("placarbrancas");
    const placarPretas= document.getElementById("placarpretas");
    const vezdojogador= document.getElementById("vezdojogador");

    if (canvas) {
           const ctx = canvas.getContext("2d");

        const LINHAS = 8;
        const COLUNAS = 8;
        const TAMANHO_QUADRADO = canvas.width / COLUNAS;

        // Variáveis de estado
        let jogadorAtual = 'branca';
        let placar = { branca: 0, preta: 0 };
        let pecas = [
            { x: 0, y: 0, cor: 'branca' },
            { x: 2, y: 0, cor: 'branca' },
            { x: 4, y: 0, cor: 'branca' },
            { x: 6, y: 0, cor: 'branca' },
            { x: 1, y: 1, cor: 'branca' },
            { x: 3, y: 1, cor: 'branca' },
            { x: 5, y: 1, cor: 'branca' },
            { x: 7, y: 1, cor: 'branca' },
            { x: 0, y: 6, cor: 'preta' },
            { x: 2, y: 6, cor: 'preta' },
            { x: 4, y: 6, cor: 'preta' },
            { x: 6, y: 6, cor: 'preta' },
            { x: 1, y: 7, cor: 'preta' },
            { x: 3, y: 7, cor: 'preta' },
            { x: 5, y: 7, cor: 'preta' },
            { x: 7, y: 7, cor: 'preta' }
        ];

        function desenhaTabuleiro() {
            for (let linha = 0; linha < LINHAS; linha++) {
                for (let coluna = 0; coluna < COLUNAS; coluna++) {
                    if ((linha + coluna) % 2 === 0) {
                        ctx.fillStyle = '#fff';
                    } else {
                        ctx.fillStyle = '#000';
                    }
                    ctx.fillRect(coluna * TAMANHO_QUADRADO, linha * TAMANHO_QUADRADO, TAMANHO_QUADRADO, TAMANHO_QUADRADO);
                }
            }
        }

        function desenhaPecas() {
            pecas.forEach(peca => {
                ctx.beginPath();
                ctx.arc((peca.x * TAMANHO_QUADRADO) + (TAMANHO_QUADRADO / 2), (peca.y * TAMANHO_QUADRADO) + (TAMANHO_QUADRADO / 2), TAMANHO_QUADRADO / 2 - 5, 0, Math.PI * 2);
                ctx.fillStyle = peca.cor === 'branca' ? '#fff' : '#000';
                ctx.fill();
                ctx.strokeStyle = '#000';
                ctx.stroke();
            });
        }

        function desenhaTabuleiroEPecas() {
            desenhaTabuleiro();
            desenhaPecas();
        }

        function atualizaPlacar(){
            placarBrancas.textContent=`brancas: ${placar.branca}`;
            placarPretas.textContent=`pretas: ${placar.preta}`;
            vezdojogador.textContent=`vez de : ${jogadorAtual.charAt(0).toUpperCase() + jogadorAtual.slice(1)}`;
        }
        

        desenhaTabuleiroEPecas();
        atualizaPlacar();

        let selecionado = null;
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const coluna = Math.floor(x / TAMANHO_QUADRADO);
            const linha = Math.floor(y / TAMANHO_QUADRADO);

            if (selecionado === null) {
                selecionado = pecas.find(peca => peca.x === coluna && peca.y === linha && peca.cor === jogadorAtual);
                if (selecionado) {
                    desenhaTabuleiroEPecas();
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(selecionado.x * TAMANHO_QUADRADO, selecionado.y * TAMANHO_QUADRADO, TAMANHO_QUADRADO, TAMANHO_QUADRADO);
                }
            } else {
                const pecaExistente = pecas.find(peca => peca.x === coluna && peca.y === linha);
                if (selecionado && !pecaExistente) {
                    const deltaX = coluna - selecionado.x;
                    const deltaY = linha - selecionado.y;
                    if (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 1) {
                        // Movimento simples
                        selecionado.x = coluna;
                        selecionado.y = linha;
                        jogadorAtual = jogadorAtual === 'branca' ? 'preta' : 'branca';
                        selecionado = null;
                        desenhaTabuleiroEPecas();
                        atualizaPlacar();
                    } else if (Math.abs(deltaX) === 2 && Math.abs(deltaY) === 2) {
                        // Captura de peça
                        const meioX = selecionado.x + deltaX / 2;
                        const meioY = selecionado.y + deltaY / 2;
                        const pecaCapturada = pecas.find(peca => peca.x === meioX && peca.y === meioY && peca.cor !== jogadorAtual);
                        if (pecaCapturada) {
                            pecas = pecas.filter(peca => peca !== pecaCapturada);
                            selecionado.x = coluna;
                            selecionado.y = linha;
                            placar[jogadorAtual]++;
                            jogadorAtual = jogadorAtual === 'branca' ? 'preta' : 'branca';
                            selecionado = null;
                            desenhaTabuleiroEPecas();
                            atualizaPlacar();
                        }
                    }else {
                        selecionado = null 
                    }
                }else{selecionado=null}
            }
        });
    }
});