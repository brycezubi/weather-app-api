import {computed , ref} from 'vue'
export default function useClima() {
  const cargando = ref(false);
  const error = ref("");
  const clima = ref({});

  const obtenerParametros = async (busqueda) => {
    const { ciudad, pais } = busqueda;
    const key = import.meta.env.VITE_API_KEY;

    try {
      clima.value = {}
      error.value=''
      cargando.value = true;
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
      const datos = await fetch(url);
      if (!datos.ok) throw new Response("Error al conectar con la Url");
      const res = await datos.json();
      const { lat, lon } = res[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      const datosClima = await fetch(urlClima);
      if (!datosClima.ok) throw new Response("Error conectar Url");
      const resClima = await datosClima.json();
      clima.value = resClima;
    } catch {
      error.value = "Ciudad no Encontrada";
    } finally {
      cargando.value = false;

    }
  };

  const mostrarClima = computed(()=>{
    return Object.values(clima.value).length > 0
  })
  const formartearTemperatura = (temp) => parseInt(temp - 273.15);

  return {
    cargando,
    obtenerParametros,
    clima,
    error,
    mostrarClima,
    formartearTemperatura,
  };
}
