import CARRERAS from "./carreras";
import { COLORS } from "./theme";

export const USER_FORM =
  "https://docs.google.com/forms/u/1/d/e/1FAIpQLSedZWz0SJOLsxEscmHo8FDdTQyIF5xTczGBqr1Z6oLwKwiemw/formResponse";

export const USER_FORM_ENTRIES = {
  padron: "entry.1608351524",
  carrera: "entry.1130086596",
  orientacion: "entry.1483291801",
  finDeCarrera: "entry.310979509",
};

export const GRAPH_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScEomNxSEdv07ifB9ep5olsemzRjdPoMMhWL6GLGhswm93shg/formResponse";

export const GRAPH_FORM_ENTRIES = {
  padron: "entry.2064135385",
  carrera: "entry.977368567",
  map: "entry.2113204957",
};

export const BUGS_FORM =
  "https://docs.google.com/forms/d/1Mr4-4qWqZKaobjG3GI30aPvC5qlMsd6Eib3YGUbLd2k/formResponse";

export const BUGS_FORM_ENTRIES = {
  padron: "entry.108884877",
  carrera: "entry.30310619",
  orientacion: "entry.2052513370",
  finDeCarrera: "entry.1835776497",
  bug: "entry.817568535",
};

export const SPREADSHEET =
  "https://sheets.googleapis.com/v4/spreadsheets/1b6h2RApBs2xbN6-eGVvxH68EALKDklvS91fb7d_IVz4/values";

export const SHEETS = {
  user: "usuarios",
  registros: "registros",
};

export const KEY = "AIzaSyA9snz4CXDq_K8fJeUXkRtRZAQM90HTFp4";

export const GRUPOS = {
  Aprobadas: { color: COLORS.aprobadas[400] },
  CBC: {
    shape: "hexagon",
    size: 30,
  },
  "*CBC": {
    color: COLORS.aprobadas[100],
    shape: "square",
    size: 15,
  },
  Habilitadas: { color: COLORS.habilitadas[400] },
  "En Final": { color: COLORS.enfinal[400] },
  "Materias Obligatorias": { color: COLORS.obligatorias[400] },
  "Materias Electivas": { color: COLORS.electivas[400] },
  "Fin de Carrera": {
    color: COLORS.findecarrera[400],
    label: "custom",
    shape: "custom",
    ctxRenderer: ({
      ctx,
      id,
      x,
      y,
      state: { selected, hover },
      style,
      label
    }) => {
      let r = style.size;
      const drawNode = () => {
        if (selected || hover) {
          r += 5
        }
        ctx.beginPath();
        const sides = 4;
        const a = (Math.PI * 2) / sides;
        ctx.moveTo(x, y + r);
        for (let i = 1; i < sides; i++) {
          ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
        }
        ctx.closePath();
        ctx.save();

        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.textAlign = 'center'
        const lines = label.split('\n')
        const lineheight = 13;
        const mid = Math.floor(lines.length / 2);
        let fontSize = 12
        let maxLineWidth = 0
        for (let i = 0; i < lines.length; i++) {
          if (ctx.measureText(lines[i]).width > maxLineWidth) {
            maxLineWidth = ctx.measureText(lines[i]).width
          }
        }
        if (maxLineWidth > r * 1.5) {
          fontSize -= 1
        }
        ctx.font = `bold ${fontSize}px arial`
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x, y + ((i + 0.2 - mid) * lineheight))
        }
      };
      return {
        drawNode,
      };
    },
    size: 60,
  },
  "Fin de Carrera (Obligatorio)": {
    color: COLORS.findecarrera[400],
    label: "custom",
    shape: "custom",
    ctxRenderer: ({
      ctx,
      id,
      x,
      y,
      state: { selected, hover },
      style,
      label
    }) => {
      let r = style.size;
      const drawNode = () => {
        if (selected || hover) {
          r += 5
        }
        ctx.beginPath();
        const sides = 4;
        const a = (Math.PI * 2) / sides;
        ctx.moveTo(x, y + r);
        for (let i = 1; i < sides; i++) {
          ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
        }
        ctx.closePath();
        ctx.save();

        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.textAlign = 'center'
        const lines = label.split('\n')
        const lineheight = 13;
        const mid = Math.floor(lines.length / 2);
        let fontSize = 12
        let maxLineWidth = 0
        for (let i = 0; i < lines.length; i++) {
          if (ctx.measureText(lines[i]).width > maxLineWidth) {
            maxLineWidth = ctx.measureText(lines[i]).width
          }
        }
        if (maxLineWidth > r * 1.5) {
          fontSize -= 1
        }
        ctx.font = `bold ${fontSize}px arial`
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x, y + ((i + 0.2 - mid) * lineheight))
        }
      };
      return {
        drawNode,
      };
    },
    size: 60,
  },
  ...CARRERAS.filter((c) => c.orientaciones)
    .flatMap((c) => c.orientaciones)
    .reduce(function (map, obj) {
      obj.color = COLORS[obj.colorScheme][500];
      map[obj.nombre] = obj;
      return map;
    }, {}),
};

export const GRAPHOPTIONS = {
  nodes: { shape: "box" },
  interaction: {
    hover: true,
  },
  physics: {
    // Fede del futuro: Deja de intentar hacer funcionar esto. No trae casi nada de valor al programa, y ya pasaste más de 5 noches intentándolo, sin resultado alguno.
    //   Si estas queriendo hacerlo andar, espero que este comentario te recuerde la realidad: no sirve de nada, y no te va a quedar lindo. Es un capricho, y no lo vale.
    // enabled: true
    enabled: false,
    hierarchicalRepulsion: {
      nodeDistance: 90,
    },
    stabilization: {
      iterations: 30,
      fit: true,
    },
  },
  layout: {
    hierarchical: {
      enabled: true,
      parentCentralization: false,
      blockShifting: false,
      edgeMinimization: false,
      direction: "LR",
    },
  },
  edges: {
    hoverWidth:0,
    arrowStrikethrough: false,
    arrows: {
      to: { enabled: true, scaleFactor: 0.6, type: "arrow" },
    },
    color: { inherit: "from", opacity: 0.7 },
  },
  groups: { ...GRUPOS },
};
