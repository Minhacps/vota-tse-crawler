# VotaSP Crawler

O objetivo desse projeto é obter dados das(os) candidatas(os) da eleição de 2018.
Utilizando a api aberta do TSE nós buscamos os dados e salvamos dentro do [VotaSP](http://votasp.org.br).

## Candidatas(os) a deputada(o) federal

A lista com todas as pessoas que estão concorrendo a este cargo no estado de SP é obtida pelo endereço:
http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/SP/2022802018/6/candidatos

## Candidatas(os) a deputada(o) estadual

A lista com todas as pessoas que estão concorrendo a este cargo no estado de SP é obtida pelo endereço:
http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/SP/2022802018/7/candidatos

## Detalhes da(o) candidata(o)

Os detalhes são obtidos pelo endereço:
http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/SP/2022802018/candidato/*:id*
