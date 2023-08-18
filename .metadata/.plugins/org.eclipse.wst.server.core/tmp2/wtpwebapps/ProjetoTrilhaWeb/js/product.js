COLDIGO.produto = new Object();

$(document).ready(function() {
	COLDIGO.produto.carregarMarcas = function() {
		alert("Tentando buscar marcas");
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			success: function(marcas) {

				if (marcas != "") {
					$("#selMarca").html("");
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = "Escolha"; // Correção aqui
					$("#selMarca").append(option);

					for (var i = 0; i < marcas.length; i++) {
						var option = document.createElement("option");
						option.setAttribute("value", marcas[i].id);
						option.innerHTML = marcas[i].nome;
						$("#selMarca").append(option);
					}

				} else {
					$("#selMarca").html("");

					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = "Cadastre uma marca primeiro!";
					$("#selMarca").append(option);
					$("#selMarca").addClass("aviso");
				}
			},
			error: function(info) {
				console.log(info);
				COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
				$("#selMarca").html("");
				var option = document.createElement("option");
				option.setAttribute("value", "");
				option.innerHTML = "Erro ao carregar marcas!";
				$("#selMarca").append(option);
				$("#selMarca").addClass("aviso");
			}
		});
	}


	COLDIGO.produto.carregarMarcas();

	//validar se todos os campos do cadastro foram preenchidos
	COLDIGO.produto.cadastrar = function() {
		
		var produto = new Object();
		produto.categoria = document.frmAddProduto.categoria.value;
		produto.marcaId = document.frmAddProduto.marcaId.value;
		produto.modelo = document.frmAddProduto.modelo.value;
		produto.capacidade = document.frmAddProduto.capacidade.value;
		produto.valor = document.frmAddProduto.valor.value;

		if ((produto.categoria == "") || (produto.marcaId == "") || (produto.modelo == "") || (produto.capacidade == "") || (produto.valor == "")) {
			COLDIGO.exibirAviso("Preencha todos os campos!")
		} else {
			$.ajax({
				//com este post, faremos o cadastro de um novo produto
				//converter objetos JavaScript em JSON antes de enviá-los ao servidor é uma maneira eficaz de garantir a interoperabilidade, segurança e eficiência na troca de dados entre o cliente e o servidor em aplicações web.
				type: "POST",
				url: COLDIGO.PATH + "produto/inserir",
				data: JSON.stringify(produto),
				success: function(msg) {
					COLDIGO.exibirAviso(msg);
					$("#addProduto").trigger("reset");
				},
				error: function(info) {
					COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: " + info.status + " . " + info.statusText);
				}
			});
		}
	}; // Correção: troquei ")" por ";"
});