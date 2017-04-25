## **Referência API** ##
----------
## Login ##

Realiza login com facebook GET
> /auth/facebook

## Usuario ##

Busca dados do usuário GET
> /api/user/:id

Relaciona uma quest ao usuário POST
> /api/user/:id/addquest


    {
		"quest" : "iddaquest"
	}

## Quests ##

Busca todas as quests GET
> /api/quests

Busca uma quest por id GET
> /api/quests/:id

Nova quest POST
> /api/quests/new

    {
		"criador" : "iddousuariocriador",
		"local" : {
			latitude  : "-26.92088827",
			longitude : "-48.65585883"
		},
		"nome" : "nome da quest",
		"subtitulo" : "subtitulo da quest",
		"descricao" : "descricao da quest",
		"visibilidade" : "privada ou publica",
		"objetivos" : [
		{
		    "local" 	: {
			latitude  : "-26.92088547",
			longitude : "-48.66885883"
		    },
	            "estagio"   : 1,
	            "titulo"	: "titulo do objetivo",
	            "descricao" : "descricao do objetivo"
		},
		{
		    "local" 	: {
			latitude  : "-26.92088547",
			longitude : "-48.66885883"
		    },
	            "estagio"   : 2,
	            "titulo"	: "titulo do objetivo",
	            "descricao" : "descricao do objetivo"
		}
		]
	}

Editar quest PATCH
> /api/quests/:id

    {
		"criador" : "iddousuariocriador",
		"local" : {
			latitude  : "-26.92088827",
			longitude : "-48.65585883"
		},
		"nome" : "nome da quest",
		"subtitulo" : "subtitulo da quest",
		"descricao" : "descricao da quest",
		"visibilidade" : "privada ou publica",
		"objetivos" : [
		{
		    "local" 	: {
			latitude  : "-26.92088547",
			longitude : "-48.66885883"
		    },
	            "estagio"   : 1,
	            "titulo"	: "titulo do objetivo",
	            "descricao" : "descricao do objetivo"
		},
		{
		    "local" 	: {
			latitude  : "-26.92088547",
			longitude : "-48.66885883"
		    },
	            "estagio"   : 2,
	            "titulo"	: "titulo do objetivo",
	            "descricao" : "descricao do objetivo"
		}
		]
	}

Deleta quest DELETE

> /api/quests/:id

## Locais ##

Busca todas os locais GET
> /api/locais

Busca um local por id GET
> /api/local/:id

Novo local POST
> /api/locais/new

    {
		"nome" : "nome do local",
		"coordenada" : {
			"latitude" : "40.7143528",
			"longitude" : "-74.0059731"
		},
		"mestre" : "iddousuariomestre"
	}

Editar local PATCH
> /api/locais/:id

      {
		"nome" : "nome do local",
		"coordenada" : {
			"latitude" : "40.7143528",
			"longitude" : "-74.0059731"
		},
		"mestre" : "iddousuariomestre"
	}

Deleta local DELETE

> /api/locais/:id

## Campanhas ##

Busca todas as campanhas GET
> /api/campanhas

Busca uma campanha por id GET
> /api/campanhas/:id

Nova campanha POST
> /api/campanhas/new

    {
		"mestre" : "iddomestre",
		"nome" : "nome da campanha",
		"descricao" : "descricao da campanha",
		"usuarios" : ["idusuario1", "idusuario2", ...],
		"quests" : ["idquest1", "idquest2", ...]
	}

Editar campanha PATCH
> /api/campanhas/:id

    {
		"mestre" : "iddomestre",
		"nome" : "nome da campanha",
		"descricao" : "descricao da campanha",
		"usuarios" : ["idusuario1", "idusuario2", ...],
		"quests" : ["idquest1", "idquest2", ...]
	}

Deleta campanha DELETE

> /api/campanhas/:id

## Mesas ##

Busca todas as mesas GET
> /api/mesas

Busca uma mesa por id GET
> /api/mesas/:id

Nova mesa POST
> /api/mesas/new

    {
		"nome" : "nome da mesa",
		"descricao" : "descricao da mesa",
		"usuarios" : ["idusuario1", "idusuario2", ...],
	}

Editar mesa PATCH
> /api/mesas/:id

    {
		"nome" : "nome da mesa",
		"descricao" : "descricao da mesa",
		"usuarios" : ["idusuario1", "idusuario2", ...],
	}

Deleta mesa DELETE

> /api/mesas/:id
