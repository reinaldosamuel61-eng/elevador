# Desafio do Elevador Inteligente - ETEC

## 📊 Comparação de Resultados

| Métrica | Estratégia A (Ordem de Chegada) | Estratégia B (Mais Próximo Primeiro) |
| :--- | :---: | :---: |
| **Ordem de Atendimento** | (0,4) -> (2,1) -> (3,0) -> (4,2) | (0,4) -> (4,2) -> (2,1) -> (3,0) |
| **Deslocamento Total** | 18 andares | 14 andares |
| **Tempo Total Gasto** | 94 segundos | 64 segundos |

## 💡 Conclusão e Justificativa

A **Estratégia B (Mais Próximo Primeiro)** teve o melhor resultado, gerando uma economia de **30 segundos** e **4 andares** de deslocamento. 

Ela foi escolhida por ser mais eficiente, pois:
1. **Reduz o tempo de espera** dos usuários ao buscar quem está mais perto da posição atual do elevador.
2. **Economiza energia** e diminui o desgaste do motor do elevador ao evitar viagens longas desnecessárias.
