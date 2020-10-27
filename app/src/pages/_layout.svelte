<script>
  import { initClient } from '../lib/graphql/client'
  import { setClient } from 'svelte-apollo'

  const client = initClient()

  setClient(client)

</script>

<slot />
