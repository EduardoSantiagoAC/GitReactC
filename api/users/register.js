export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, password, userType, profilePhoto } = req.body;

            // Aquí puedes agregar lógica para guardar el nuevo usuario en una base de datos

            // Responde con éxito
            return res.status(200).json({ message: 'Usuario registrado exitosamente.' });
        } catch (error) {
            // Si hay algún error
            return res.status(500).json({ message: 'Error al procesar la solicitud.' });
        }
    } else {
        // Si no es un método POST
        return res.status(405).json({ message: 'Método no permitido.' });
    }
}
