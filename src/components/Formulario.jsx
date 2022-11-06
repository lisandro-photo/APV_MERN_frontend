import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"
import PacientesContext from "../context/PacientesProvider"

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setTelefono(paciente.telefono)
            setDireccion(paciente.direccion)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if ([nombre, propietario, email, telefono, direccion, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        guardarPaciente({ nombre, propietario, email, telefono, direccion, fecha, sintomas, id })
        setAlerta({
            msg: 'Guardado Correctamente'
        })
        
        setNombre('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setDireccion('')
        setFecha('')
        setSintomas('')
        setId(null);
        setTimeout(() => {
            setAlerta({
                msg: "",
            });
        }, 3000);
    }

    const { msg } = alerta
    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus Pacientes y {' '}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-xl"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota :</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario :</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >E-Mail :</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="E-Mail para contactar"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="telefono"
                        className="text-gray-700 uppercase font-bold"
                    >Teléfono :</label>
                    <input
                        id="telefono"
                        type="number"
                        placeholder="Teléfono de contacto"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="direccion"
                        className="text-gray-700 uppercase font-bold"
                    >Dirección :</label>
                    <input
                        id="direccion"
                        type="text"
                        placeholder="Domicilio del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Ingreso</label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Síntomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas que presenta la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={ id ? 'Guardar Cambio' : 'Agregar Paciente'}
                    className="bg-indigo-600 rounded-xl w-full p-3 text-white font-bold uppercase hover:bg-indigo-800 cursor-pointer transition-colors"
                />
            </form>

            
            {msg && <Alerta alerta={alerta} />}

        </>
    )
}

export default Formulario