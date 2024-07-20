document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('damasTabuleiro');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const LINHAS = 8;
        const COLUNAS = 8;
        const TAMANHO_QUADRADO = canvas.width / COLUNAS;

        // Dados das peças
        const pecas = [
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

        desenhaTabuleiroEPecas();

        let seleciondo = null;
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.left;
            const coluna = Math.floor(x / TAMANHO_QUADRADO);
            const linha = Math.floor(y / TAMANHO_QUADRADO);

            if (seleciondo === null) {
                seleciondo = pecas.find(peca => peca.x === coluna && peca.y === linha);
                if (seleciondo) {
                    desenhaTabuleiroEPecas();
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(seleciondo.x * TAMANHO_QUADRADO, seleciondo.y * TAMANHO_QUADRADO, TAMANHO_QUADRADO, TAMANHO_QUADRADO);

                }
                } else {
                    if(seleciondo){
                        seleciondo.x = coluna;
                        seleciondo.y = linha;
                        seleciondo = null;
                        desenhaTabuleiroEPecas();


                    }
                }

        });
}else{
    print('teste')
}});