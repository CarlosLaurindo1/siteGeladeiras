COLDIGO.marca = new Object();

$(document).ready(function() {
	COLDIGO.marca.cadastrar = function() {

		var marca = new Object();
		marca.nome = document.frmAddMarca.nome.value;


		if (marca.nome == "") {
			COLDIGO.exibirAviso("Preencha todos os campos!")
		} else {
			$.ajax({
				//com este post, faremos o cadastro de um novo 
				//converter objetos JavaScript em JSON antes de enviá-los ao servidor é uma maneira eficaz de garantir a interoperabilidade, segurança e eficiência na troca de dados entre o cliente e o servidor em aplicações web.
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data: JSON.stringify(marca),
				success: function(msg) {
					COLDIGO.exibirAviso(msg);
					$("#addMarca").trigger("reset");
				},
				error: function(info) {
					COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca: " + info.status + " . " + info.statusText);
				}
			});
		}
	};

	COLDIGO.marca.exibir = function(listaDeMarcas) {
		var tabela = "<table>" +
			"<tr>" +
			"<th>ID</th>" +
			"<th>Marca</th>" +
			"<th class='acoes'>Ações</th>" +
			"</tr>";

		if (listaDeMarcas != undefined && listaDeMarcas.length > 0) {
			for (var i = 0; i < listaDeMarcas.length; i++) {
				tabela += "<tr>" +
					"<td>" + listaDeMarcas[i].id + "</td>" +
					"<td>" + listaDeMarcas[i].nome + "</td>" +
					"<td>" +
					"<a onclick=\"COLDIGO.marca.exibirEdicao('" + listaDeMarcas[i].id + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
					"<a onclick=\"COLDIGO.marca.excluir('" + listaDeMarcas[i].id + "')\")><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
					"</td>" +
					"</tr>";
			}
		} else if (listaDeMarcas == "") {
			tabela += "<tr><td colspan='6' > Nenhum registro encontrado</td ></tr > ";
		}
		tabela += "</table>";

		return tabela;
	};

	COLDIGO.marca.buscar = function() {
		var valorBusca = $("#campoBuscaMarca").val();

		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data: "valorBusca=" + valorBusca,
			success: function(dados) {
				dados = JSON.parse(dados);
				$("#listaMarcas").html(COLDIGO.marca.exibir(dados));
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao consultar os contatos: " + info.status + " - " + info.statusText);
			}
		});
	};
	COLDIGO.marca.buscar();

	COLDIGO.marca.excluir = function(id) {
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "marca/excluir/" + id,
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao excluir : " + info.status + " - " + info.statusText);
			}
		});
	};
	COLDIGO.marca.buscar();


	COLDIGO.marca.exibirEdicao = function(id) {
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id=" + id,
			success: function() {
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;

				var selCategoria = document.getElementById('selCategoriaEdicao');
				for (var i = 0; i < selCategoria.length; i++) {
					if (selCategoria.options[i].value == marca.nome) {
						selCategoria.options[i].setAttribute("selected", "selected");
					} else {
						selCategoria.options[i].removeAttribute("selected");
					}
				}

				COLDIGO.marca.carregarMarcas(id);

				var modalEditaMarca = {
					title: "Editar Marca",
					height: 400,
					width: 550,
					modal: true,
					buttons: {
						"Salvar": function() {
							COLDIGO.marca.editar();
						},
						"Cancelar": function() {
							$(this).dialog("close");
						},
						close: function() {

						}
					}
				};
				$("#modalEditaMarca").dialog(modalEditaMarca);
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao buscar  para edição: " + info.status + " - " + info.statusText);
			}
		});
	};

	COLDIGO.marca.editar = function() {

		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;

		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao editar marca: " + info.status + " - " + info.statusText);
			}
		});

	};
});