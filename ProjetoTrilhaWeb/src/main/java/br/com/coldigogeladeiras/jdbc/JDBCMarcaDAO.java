package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO implements MarcaDAO {
	private Connection conexao;

	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public List<Marca> buscar() {
		// TODO Auto-generated method stub

		String comando = "SELECT * FROM marcas";
		List<Marca> listMarcas = new ArrayList<Marca>();

		Marca marca = null;

		try {
			Statement stmt = conexao.createStatement();

			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {
				marca = new Marca();

				int id = rs.getInt("id");
				String nome = rs.getString("nome");

				marca.setId(id);
				marca.setNome(nome);
				System.out.println(marca);
				listMarcas.add(marca);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return listMarcas;
	}

	public boolean inserir(Marca marca) {
		String comando = "INSERT INTO marcas" + "(id, nome)" + "Values(?,?)";
		PreparedStatement m;

		try {
			m = this.conexao.prepareStatement(comando);

			m.setInt(1, marca.getId());
			m.setString(2, marca.getNome());
			m.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<JsonObject> buscarPorNome(String nome) {
		String comando = "SELECT * FROM marcas ";
		if (!nome.equals("")) {
			comando += "WHERE nome LIKE '%" + nome + "%' ";
		}
		comando += "ORDER BY id ASC, nome ASC";

		List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
		JsonObject marca = null;

		try {
			Statement stmt = conexao.createStatement();
			System.out.println(comando);
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {
				int id = rs.getInt("id");
				nome = rs.getString("nome");

				marca = new JsonObject();
				marca.addProperty("id", id);
				marca.addProperty("nome", nome);

				listaMarcas.add(marca);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listaMarcas;
	}

	public boolean deletar(int id) {
		String comando = "DELETE FROM marcas WHERE id = ?";
		PreparedStatement m;
		try {
			m = this.conexao.prepareStatement(comando);
			m.setInt(1, id);
			m.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Marca buscarPorId(int id) {
		String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
		Marca marca = new Marca();
		try {
			PreparedStatement m = this.conexao.prepareStatement(comando);
			m.setInt(1, id);
			ResultSet rs = m.executeQuery();
			while (rs.next()) {
				String nome = rs.getString("nome");

				marca.setId(id);
				marca.setNome(nome);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return marca;
	}
	
	public boolean verificarProduto(int id) {
		String comando = "SELECT marcas.id, marcas.nome, produtos.id, produtos.marcas_id\r\n"
				+ "FROM marcas, produtos\r\n"
				+ "WHERE marcas.id = produtos.marcas_id";
		Marca marca = new Marca();
		try {
			PreparedStatement m = this.conexao.prepareStatement(comando);
			m.setInt(1, id);
			ResultSet rs = m.executeQuery();
			while (rs.next()) {
				String nome = rs.getString("nome");

				marca.setId(id);
				marca.setNome(nome);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
		
	}

	public boolean alterar(Marca marca) {
		String comando = "UPDATE marcas " + "SET nome=? " + "WHERE id=? ";
		PreparedStatement m;
		try {
			m = this.conexao.prepareStatement(comando);
			m.setString(1, marca.getNome());
			m.setInt(2, marca.getId());
			m.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
