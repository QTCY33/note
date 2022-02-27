<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar">
        <div class="note-bar-time" v-if="true">
          <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        </div>
        <div>
          <span> 所属笔记本: {{ belongTo }}</span>
          <a class="btn action" @click="onRevert">恢复</a>
          <a class="btn action" @click="onDelete">彻底删除</a>
        </div>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();

export default {
  data() {
    return {};
  },

  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
    this.getTrashNotes().then(() => {
      this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId });
      this.$router.replace({
        path: "/trash",
        query: {
          noteId: this.curTrashNote.id,
        },
      });
    });
  },

  computed: {
    ...mapGetters(["trashNotes", "curTrashNote", "belongTo"]),

    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "");
    },
  },

  methods: {
    ...mapMutations(["setCurTrashNote"]),

    ...mapActions([
      "checkLogin",
      "deleteTrashNote",
      "revertTrashNote",
      "getTrashNotes",
      "getNotebooks",
    ]),

    onDelete() {
      this.$confirm("删除后将无法恢复", "确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.deleteTrashNote({ noteId: this.curTrashNote.id });
        })
        .then(() => {
          this.setCurTrashNote();
          this.$router.replace({
            path: "/trash",
            query: { noteId: this.curTrashNote.id },
          });
        });
    },

    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNote.id }).then(() => {
        this.setCurTrashNote();
        this.$router.replace({
          path: "/trash",
          query: {
            noteId: this.curTrashNote.id,
          },
        });
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId });
    next();
  },
};
</script>

<style scoped>
@import "~@/assets/css/note-detail.css";
@import "~@/assets/css/note-sidebar.css";
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
.note-title {
  padding: 20px 25px;
  font-weight: bold;
}
.action {
  float: right;
  margin-left: 10px;
  padding: 5px 14px;
  font-size: 12px;
}
.action:hover {
  color: white;
  background: #eee;
}
.note-bar > div {
  padding: 10px;
}
</style>
