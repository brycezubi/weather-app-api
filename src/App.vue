<script setup>
import Spinner from "./components/Spinner.vue";
import Clima from "./components/Clima.vue";
import Titulo from "./components/Titulo.vue";
import Formulario from "./components/Formulario.vue";
import Alert from "./components/Alert.vue";
import useClima from "./composables/useClima";

  const { obtenerParametros ,error, clima , cargando , mostrarClima} = useClima()

</script>

<template>
  <Titulo />
  <main
    class="contenedor grid gap-5 lg:grid-cols-2 lg:items-center lg:h-[60vh]"
  >
    <Formulario  @obtener-clima="obtenerParametros"/>
    <Spinner v-if="cargando"/>
    <Alert v-if="error">
      {{error}}
    </Alert>
    <Clima  v-if="mostrarClima" v-bind:clima="clima"/>

  </main>
</template>

<style>
.contenedor {
  @apply container mx-auto max-w-5xl my-10 w-11/12 md:w-5/6 lg:w-full;
}

.campo {
  @apply flex flex-col gap-1;
}
</style>
