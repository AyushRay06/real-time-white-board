import { useSelf, useMutation } from "@liveblocks/react/suspense"
import { playDeleteSound } from "@/app/board/[boardId]/_components/audio-feedback"

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection)

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers")
      const liveLayerIds = storage.get("layerIds")
      let deletedAny = false

      for (const id of selection) {
        const layer = liveLayers.get(id)
        if (layer && (layer as any).get("isLocked")) {
          continue
        }
        liveLayers.delete(id)

        const index = liveLayerIds.indexOf(id)

        if (index !== -1) {
          liveLayerIds.delete(index)
          deletedAny = true
        }
      }
      if (deletedAny) {
        playDeleteSound()
      }
      setMyPresence({ selection: [] }, { addToHistory: true })
    },
    [selection]
  )
}
