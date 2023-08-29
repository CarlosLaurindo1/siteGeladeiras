package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.ProdutoDAO;
import br.com.coldigogeladeiras.modelo.Produto;

public class JDBCProdutoDAO implements ProdutoDAO {
	private Connection conexao;

	public JDBCProdutoDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserir(Produto produto) {
		String comando = "INSERT INTO produtos" + "(id, categoria, modelo, capacidade, valor, marcas_id)"
				+ "Values(?,?,?,?,?,?)";
		PreparedStatement p;

		try {
			p = this.conexao.prepareStatement(comando);

			p.setInt(1, produto.getId());
			p.setString(2, produto.getCategoria());
			p.setString(3, produto.getModelo());
			p.setInt(4, produto.getCapacidade());
			p.setFloat(5, produto.getValor());
			p.setInt(6, produto.getMarcaId());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<JsonObject> buscarPorNome(String nome) {
		String comando = "SELECT produtos. *, marcas.nome as marca FROM produtos "
				+ "INNER JOIN marcas on produtos.marcas_id = marcas.id ";
		// O INNER JOIN é responsável pela junção dos dados em que somente a condição do
		// join é verdadeira, no caso acima estamos juntando duas tabelas diferentes e
		// só deve trazer os resultados dos produtos que possuem uma marca vinculada
		if (!nome.equals("")) {
			comando += "WHERE modelo LIKE '%" + nome + "%' ";
		}

		// O ORDER by vai fazer a ordenação dos resultados, no caso abaixo está
		// realizando a ordenação de forma crescente considerando a hierarquia:
		// categoria, depois marca e depois modelo
		comando += "ORDER BY categoria ASC, marcas.nome ASC, modelo ASC";

		List<JsonObject> listaProdutos = new ArrayList<JsonObject>();
		JsonObject produto = null;

		try {
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {
				int id = rs.getInt("id");
				String categoria = rs.getString("categoria");
				String modelo = rs.getString("modelo");
				int capacidade = rs.getInt("capacidade");
				float valor = rs.getFloat("valor");
				String marcaNome = rs.getString("marca");

				if (categoria.equals("1")) {
					categoria = "Geladeira";
				} else if (categoria.equals("2")) {
					categoria = "Freezer";
				}

				produto = new JsonObject();
				produto.addProperty("id", id);
				produto.addProperty("categoria", categoria);
				produto.addProperty("modelo", modelo);
				produto.addProperty("capacidade", capacidade);
				produto.addProperty("valor", valor);
				produto.addProperty("marcaNome", marcaNome);

				listaProdutos.add(produto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaProdutos;
	}

	public boolean deletar(int id) {
		String comando = "DELETE FROM produtos WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Produto buscarPorId(int id) {
		String comando = "SELECT * FROM produtos WHERE produtos.id = ?";
		Produto produto = new Produto();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				String categoria = rs.getString("categoria");
				String modelo = rs.getString("modelo");
				int capacidade = rs.getInt("capacidade");
				float valor = rs.getFloat("valor");
				int marcaId = rs.getInt("marcas_id");

				produto.setId(id);
				produto.setCategoria(categoria);
				produto.setMarcaId(marcaId);
				produto.setModelo(modelo);
				produto.setCapacidade(capacidade);
				produto.setValor(valor);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return produto;

	}

}