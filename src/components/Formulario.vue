<script setup>
import { reactive } from "vue";
import { paises } from "../data/index";
import Alert from "./Alert.vue";
import useClima from "../composables/useClima";

const {error} = useClima()

const emit=defineEmits(['obtener-clima'])


const busqueda = reactive({
  ciudad: "",
  pais: "",
});

const consultarClima = () => {
  if (Object.values(busqueda).includes("")) {
    error.value = "Parametros de busqueda Obligatorios";

    setTimeout(() => {
      error.value = "";
    }, 1200);
    return;
  }
  emit('obtener-clima' , busqueda);
};
</script>

<template>
  <form
    @submit.prevent="consultarClima"
    class="w-5/6 md:w-4/6 mx-auto lg:w-full border rounded-md p-5 flex flex-col gap-5"
  >
    <legend class="text-center text-3xl text-amber-400 font-bold">
      Consultas
    </legend>
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="campo">
      <label
        class="font-medium text-amber-400 text-lg"
        for="city"
        >Ciudad</label
      >
      <input
        class="py-2 rounded-md px-5"
        type="text"
        placeholder="Lima , Buenos Aires, Caracas"
        id="city"
        v-model="busqueda.ciudad"
      />
    </div>
    <div class="campo">
      <label
        class="font-medium text-amber-400 text-lg"
        for="pais"
        >Pais</label
      >
      <select
        class="py-2 border text-center rounded-md"
        name="paises"
        id="pais"
        v-model="busqueda.pais"
      >
        <option value="">--- Seleccione su País ---</option>
        <option
          v-for="pais in paises"
          :value="pais.codigo"
        >
          {{ pais.nombre }}
        </option>
      </select>
    </div>
    <div class="flex justify-center">
      <input
        type="submit"
        value="consultar"
        class="uppercase bg-red-500 text-white font-medium w-[200px] py-2 rounded-md hover:tracking-widest transition-all hover:bg-red-500/80 cursor-pointer"
      />
    </div>
  </form>
</template>
